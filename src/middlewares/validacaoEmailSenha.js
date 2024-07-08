// middlewares/validacao.js
const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/; // Para números de telefone no Brasil

const verificaEmailValido = (req, res, next) => {
  const { email } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  next();
};

const verificaSenhaForte = (req, res, next) => {
  const { senha } = req.body;

  if (!senhaForteRegex.test(senha)) {
    return res.status(400).json({ error: "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial." });
  }

  next();
};

const verificaTelefoneValido = (req, res, next) => {
  const { whatsapp } = req.body;

  if (!telefoneRegex.test(whatsapp)) {
    return res.status(400).json({ error: "Número de telefone inválido. Deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX." });
  }

  next();
};

module.exports = {
  verificaEmailValido,
  verificaSenhaForte,
  verificaTelefoneValido,
};
