const { validationResult } = require('express-validator');
const AppDataSource = require('../config/data-source');
const { getCoordinatesFromAddress } = require('../services/geocoding');

class EventController {
  async index(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { category, date_from, date_to, search } = req.query;

      const eventRepository = AppDataSource.getRepository('Event');
      const queryBuilder = eventRepository.createQueryBuilder('event')
        .leftJoinAndSelect('event.creator', 'creator')
        .where('event.status = :status', { status: 'active' });

      // Aplicar filtros
      if (category) {
        queryBuilder.andWhere('event.category = :category', { category });
      }

      if (date_from) {
        queryBuilder.andWhere('event.dateStart >= :dateFrom', { dateFrom: date_from });
      }

      if (date_to) {
        queryBuilder.andWhere('event.dateStart <= :dateTo', { dateTo: date_to });
      }

      if (search) {
        queryBuilder.andWhere(
          '(event.title LIKE :search OR event.description LIKE :search)',
          { search: `%${search}%` }
        );
      }

      // Paginação
      const [events, total] = await queryBuilder
        .orderBy('event.dateStart', 'ASC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      res.json({
        events: events.map(event => ({
          ...event,
          creator_name: event.creator.name
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
      res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const eventRepository = AppDataSource.getRepository('Event');

      const event = await eventRepository.findOne({
        where: { id },
        relations: ['creator', 'participants', 'participants.user']
      });

      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      res.json({
        ...event,
        creator_name: event.creator.name,
        creator_email: event.creator.email,
        participants: event.participants.map(p => ({
          id: p.user.id,
          name: p.user.name,
          email: p.user.email,
          registered_at: p.registeredAt,
          status: p.status
        }))
      });
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      res.status(500).json({ error: 'Erro ao buscar evento' });
    }
  }

  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title, description, date_start, date_end, location, address,
        category, max_participants, price, image_url
      } = req.body;

      let latitude = null;
      let longitude = null;

      // Geocoding se endereço fornecido
      if (address) {
        try {
          const coordinates = await getCoordinatesFromAddress(address);
          latitude = coordinates.lat;
          longitude = coordinates.lng;
        } catch (error) {
          console.warn('Não foi possível obter coordenadas:', error.message);
        }
      }

      const eventRepository = AppDataSource.getRepository('Event');
      const userRepository = AppDataSource.getRepository('User');

      const creator = await userRepository.findOne({ where: { id: req.user.id } });
      if (!creator) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const event = eventRepository.create({
        title,
        description,
        dateStart: date_start,
        dateEnd: date_end,
        location,
        address,
        latitude,
        longitude,
        category,
        maxParticipants: max_participants,
        price,
        imageUrl: image_url,
        creator
      });

      const savedEvent = await eventRepository.save(event);

      res.status(201).json({
        message: 'Evento criado com sucesso',
        event: savedEvent
      });
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const eventRepository = AppDataSource.getRepository('Event');

      const event = await eventRepository.findOne({
        where: { id },
        relations: ['creator']
      });

      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      if (event.creator.id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Sem permissão para editar este evento' });
      }

      const updates = req.body;

      // Geocoding se endereço foi atualizado
      if (updates.address && updates.address !== event.address) {
        try {
          const coordinates = await getCoordinatesFromAddress(updates.address);
          updates.latitude = coordinates.lat;
          updates.longitude = coordinates.lng;
        } catch (error) {
          console.warn('Não foi possível obter coordenadas:', error.message);
        }
      }

      // Mapear campos com nomes diferentes
      if (updates.date_start) updates.dateStart = updates.date_start;
      if (updates.date_end) updates.dateEnd = updates.date_end;
      if (updates.max_participants) updates.maxParticipants = updates.max_participants;
      if (updates.image_url) updates.imageUrl = updates.image_url;

      await eventRepository.update(id, updates);

      res.json({ message: 'Evento atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const eventRepository = AppDataSource.getRepository('Event');

      const event = await eventRepository.findOne({
        where: { id },
        relations: ['creator']
      });

      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      if (event.creator.id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Sem permissão para deletar este evento' });
      }

      await eventRepository.remove(event);

      res.json({ message: 'Evento deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async register(req, res) {
    try {
      const { id } = req.params;
      const eventRepository = AppDataSource.getRepository('Event');
      const participantRepository = AppDataSource.getRepository('EventParticipant');
      const userRepository = AppDataSource.getRepository('User');

      const event = await eventRepository.findOne({
        where: { id, status: 'active' }
      });

      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
        return res.status(400).json({ error: 'Evento lotado' });
      }

      // Verificar se já está inscrito
      const existingParticipant = await participantRepository.findOne({
        where: { event: { id }, user: { id: req.user.id } }
      });

      if (existingParticipant) {
        return res.status(400).json({ error: 'Usuário já inscrito neste evento' });
      }

      const user = await userRepository.findOne({ where: { id: req.user.id } });
      
      const participant = participantRepository.create({
        event,
        user
      });

      await participantRepository.save(participant);

      // Atualizar contador
      await eventRepository.update(id, {
        currentParticipants: event.currentParticipants + 1
      });

      res.status(201).json({ message: 'Inscrição realizada com sucesso' });
    } catch (error) {
      console.error('Erro ao inscrever usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async unregister(req, res) {
    try {
      const { id } = req.params;
      const participantRepository = AppDataSource.getRepository('EventParticipant');
      const eventRepository = AppDataSource.getRepository('Event');

      const participant = await participantRepository.findOne({
        where: { event: { id }, user: { id: req.user.id } },
        relations: ['event']
      });

      if (!participant) {
        return res.status(404).json({ error: 'Inscrição não encontrada' });
      }

      await participantRepository.remove(participant);

      // Atualizar contador
      await eventRepository.update(id, {
        currentParticipants: participant.event.currentParticipants - 1
      });

      res.json({ message: 'Inscrição cancelada com sucesso' });
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new EventController();