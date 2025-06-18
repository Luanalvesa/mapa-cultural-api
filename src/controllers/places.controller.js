exports.create = (req, res) => {
    try {
        
        const newPlace = req.body; 

        
        console.log('Novo lugar criado:', newPlace);

        
        return res.status(201).json({ 
            message: 'Lugar criado com sucesso!', 
            place: newPlace 
        });

    } catch (error) {
        
        console.error('Erro ao criar lugar:', error);
        return res.status(500).json({ 
            message: 'Erro interno do servidor ao criar lugar.', 
            error: error.message 
        });
    }
};


exports.getAll = (req, res) => {
   
    return res.status(200).json({ message: 'Retornando todos os lugares.' });
};

exports.getById = (req, res) => {
    
    const { id } = req.params;
    return res.status(200).json({ message: `Retornando lugar com ID: ${id}` });
};

exports.update = (req, res) => {
    
    const { id } = req.params;
    return res.status(200).json({ message: `Atualizando lugar com ID: ${id}` });
};

exports.delete = (req, res) => {
    
    const { id } = req.params;
    return res.status(200).json({ message: `Deletando lugar com ID: ${id}` });
};