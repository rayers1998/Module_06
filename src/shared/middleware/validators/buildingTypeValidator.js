// src\shared\middleware\validators\buildingTypeValidator

// Ensures the building type parameter is valid.

const validBuildingTypes = ['residential', 'commercial', 'industrial'];

const validateBuildingType = (req, res, next) => {
  const { buildingType } = req.params;

  if (!validBuildingTypes.includes(buildingType.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid building type specified' });
  }
  next();
};

module.exports = { validateBuildingType };
