const { celebrate, Joi } = require('celebrate');

// Signin and Signup
const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().required(),
    password: Joi.string().min(8).alphanum().required(),
  }),
});

// For User
const validateGetUsers = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
});

const validateGetUseById = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object().keys({
    id: Joi.string()
      .regex(/^[A-Fa-f0-9]*/)
      .required(),
  }),
});

const validateChangeProfile = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(200),
  }),
});

const validateChangeAvatar = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[\w-]+\.){1,}(?:com|net|org|edu|gov|mil|co|uk|ca|de|fr|es|it|nl|se|ch|pl|ru|jp|cn|in|br|au|mx|za|no|fi|dk|id|my|kr|ar|cl|ve|pt|il)\b(?:\/[\w-]+)*\/?(?:\?[^\s]*)?(?:#[^\s]*)?$/i)
      .required(),
  }),
});

// For Cards
const validateCreateCard = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .pattern(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[\w-]+\.){1,}(?:com|net|org|edu|gov|mil|co|uk|ca|de|fr|es|it|nl|se|ch|pl|ru|jp|cn|in|br|au|mx|za|no|fi|dk|id|my|kr|ar|cl|ve|pt|il)\b(?:\/[\w-]+)*\/?(?:\?[^\s]*)?(?:#[^\s]*)?$/i)
      .required(),
    likes: Joi.array().items(Joi.string()),
  }),
});

const validateDeleteCard = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validateLike = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validateDislike = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateSignin,
  validateSignup,
  validateGetUsers,
  validateGetUseById,
  validateChangeProfile,
  validateChangeAvatar,
  validateCreateCard,
  validateDeleteCard,
  validateLike,
  validateDislike,
};
