import database from '../src/models';

class PropertyService {
  static async addProperty(newProperty) {
    try {
      return await database.Property.create(newProperty);
    } catch (error) {
      throw error;
    };
  }

  static async getAllProperties() {
    try {
      return await database.Property.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async updateProperty(id, updateProperty) {
    try {
      const propertyToUpdate = await database.Property.findOne({
        where: { id: Number(id) }
      });

      if (propertyToUpdate) {
        await database.Property.update(updateProperty, { where: { id: Number(id) } });

        return updateProperty;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAProperty(id) {
    try {
      const theProperty = await database.Property.findOne({
        where: { id: Number(id) }
      });

      return theProperty;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProperty(id) {
    try {
      const propertyToDelete = await database.Property.findOne({ where: { id: Number(id) } });

      if (propertyToDelete) {
        const deleteProperty = await database.Property.destroy({
          where: { id: Number(id) }
        });
        return deleteProperty;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default PropertyService;
