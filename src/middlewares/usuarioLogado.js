const jwt = require("jsonwebtoken");
require("../config/jwt");

const usuarioLogado = (req, res, next) => {
  const authorization = req.headers.authorization;

  if(!authorization){
    return res.status(401).json({erros: ["Precisa estar logado"]})
  }

  const token = authorization.split(" ")[1];

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = dados;
    return next();
    
  } catch (error) {
    return res.status(401).json({erros: ["Token expirado ou invalido"]})
  }
}

module.exports = usuarioLogado;