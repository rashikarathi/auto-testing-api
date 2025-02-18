const { check, validationResult } = require("express-validator");

exports.deviceAddValidator = 
    [
        check("deviceName")
            .exists({checkFalsy: true})
            .withMessage("deviceName is required")
            .isString()
            .withMessage("deviceName should be string"),
        check("model")
            .exists({checkFalsy: true})
            .withMessage("Model is required")
            .isString()
            .withMessage("Model should be string"),
        check("create_user")
        .exists()
        .withMessage("user is required"),
        check("type").optional(),
        check("platform").optional(),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => ({msg,code:'401'}));

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(401).json({ success: false, errors: error.array() });
                } else {
                next();
                }
            }
    ];

exports.deviceUpdateValidator = 
     [
        check("deviceName")
            .exists({checkFalsy: true})
            .withMessage("deviceName is required"),
        check("model")
            .exists()
            .withMessage("model is required"),
        check("update_user").exists().withMessage("update user is required"),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => ({msg,errorcode:'401'}));

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(422).json({ success: false, errors: error.array() });
                } else {
                next();
                }
            }
    ];


exports.deviceDeleteValidator = 
     [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("device id is required"),
       (req, res, next) => {
           const error = validationResult(req).formatWith(( {msg} ) => ({msg, code:'400'}));
           const hasError = !error.isEmpty();

            if (hasError) {
            res.status(400).json({ success: false, errors: error.array() });
            } else {
            next();
            }
        }
    ];

exports.deviceGetValidator = 
   [
      check("id")
          .exists({checkFalsy: true})
          .withMessage("device id is required"),
      (req, res, next) => {
          const error = validationResult(req).formatWith(( {msg} ) => ({msg, errorcode:'400'}));
          const hasError = !error.isEmpty();

          if (hasError) {
          res.status(400).json({ success: false, error: error.array() });
          } else {
          next();
          }
      }
  ];