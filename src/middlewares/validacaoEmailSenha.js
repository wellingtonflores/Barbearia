// middlewares/validacao.js
const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;

const verificaEmailValido = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

module.exports = {
  verificaEmailValido,
  verificaSenhaForte,
};
