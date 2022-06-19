const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models/Index.js");
const User = db.user;


exports.signup = (req, res, _next) => {
  User.create({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    is_admin: req.body.is_admin,
    job: req.body.job,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user) => res.status(201).json({
      user: {
        id: user.id,
        is_admin: user.is_admin,
        username: user.username,
        email: req.body.email,
        job: req.body.job,
        password: req.body.password,

      },
      userId: user.id,
      isAdmin: user.isAdmin,
      token: jwt.sign({
        userId: user.id,
        is_admin: user.is_admin,
      },
        `${process.env.SECRET_KEY}`, {
        expiresIn: '24h'
      }
      ),
      message: 'utilisateur connecté et créé',
    }))
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res, _next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur introuvable" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Mot de passe incorrect"
        });
      }

      res.status(200).json({
        user: {
          id: user.id,
          is_admin: user.is_admin,
          username: user.username,
          email: req.body.email,
          password: req.body.password,

        },
        userId: user.id,
        isAdmin: user.isAdmin,
        token: jwt.sign({
          userId: user.id,
          is_admin: user.is_admin,
        },
          `${process.env.SECRET_KEY}`, {
          expiresIn: '24h'
        }
        )

      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getProfile = (req, res, _next) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({
        user
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllProfiles = (_req, res, next) => {
  User.findAll({
    attributes: ['id', 'username', 'email', 'is_admin']
  })
    .then(users => res.status(200).json({
      users
    }))
    .catch(error => res.status(404).json({
      error
    }))

};
