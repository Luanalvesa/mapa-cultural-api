const AppDataSource = require('../config/data-source');

class UserController {
  async profile(req, res) {
    try {
      const userRepository = AppDataSource.getRepository('User');
      
      const user = await userRepository.findOne({
        where: { id: req.user.id },
        select: ['id', 'name', 'email', 'role', 'createdAt']
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
  }

  async events(req, res) {
    try {
      const eventRepository = AppDataSource.getRepository('Event');
      
      const events = await eventRepository.find({
        where: { creator: { id: req.user.id } },
        order: { dateStart: 'ASC' }
      });

      res.json(events);
    } catch (error) {
      console.error('Erro ao buscar eventos do usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }

  async registrations(req, res) {
    try {
      const participantRepository = AppDataSource.getRepository('EventParticipant');
      
      const registrations = await participantRepository.find({
        where: { user: { id: req.user.id } },
        relations: ['event'],
        order: { event: { dateStart: 'ASC' } }
      });

      const events = registrations.map(reg => ({
        ...reg.event,
        registered_at: reg.registeredAt,
        registration_status: reg.status
      }));

      res.json(events);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
      res.status(500).json({ error: 'Erro ao buscar inscrições' });
    }
  }
}

module.exports = new UserController();