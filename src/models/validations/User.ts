import Joi from '@hapi/joi';

export = (data: any) => {
    const schema = Joi.object({
        name:     Joi.string().min(6).max(255).required(),
        email:    Joi.string().min(6).max(255).email(),
        password: Joi.string().min(6).max(1024).required(),
    });

    return schema.validate(data);
}