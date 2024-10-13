import Property from "../models/property.model.js";

// Get all properties (for customers)
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve properties", error: error.message });
  }
};

// Get a specific property by ID
export const getPropertyById = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve property", error: error.message });
  }
};

// Create a new property (for Property Admins and Super Admins)
export const createProperty = async (req, res) => {
  const { title, description, location, price, amenities, images } = req.body;

  try {
    const newProperty = new Property({
      title,
      description,
      location,
      price,
      amenities,
      images,
      createdBy: req.user.id, // Track who created the property
    });

    await newProperty.save();
    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create property", error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  const { propertyId } = req.params;
  const updates = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updates,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update property", error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete property", error: error.message });
  }
};
