import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import PropertyService from '../services/PropertyService';
import Util from '../utils/Utils';


dotenv.config();
const util = new Util();

cloudinary.config({
  API_Environment_variable: process.env.CLOUDINARY_URL
});

class PropertyController {
  static addProperty(req, res) {
    const { city, estate, type, bedroom, bathroom, image_url, description, sale_or_rent } = req.body;
    if (!city || !estate || !type || !bedroom || !image_url || !bathroom || !description || !sale_or_rent) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    cloudinary.uploader.upload(image_url, async (result) => {
      const newProperty = {
        city,
        estate,
        type,
        bedroom,
        bathroom,
        description,
        sale_or_rent,
        image_url: result.url
      };
      try {
        const createdProperty = await PropertyService.addProperty(newProperty);
        util.setSuccess(201, 'Property Added!', createdProperty);
        return util.send(res);
      } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
      }
    });
  }

  static async getAllProperties(req, res) {
    try {
      const allProperties = await PropertyService.getAllProperties();
      if (allProperties.length > 0) {
        util.setSuccess(200, 'Properties retrieved', allProperties);
      } else {
        util.setSuccess(200, 'No property found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getAProperty(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theProperty = await PropertyService.getAProperty(id);

      if(!theProperty) {
        util.setError(404, `Cannot find property with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Property', theProperty);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async updateProperty(req, res) {
    const alteredProperty = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateProperty = await PropertyService.updateProperty(id, alteredProperty);
      if(!updateProperty) {
        util.setError(404, `Cannot find property with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Property updated', updateProperty);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteProperty(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const propertyToDelete = await PropertyService.deleteProperty(id);

      if (propertyToDelete) {
        util.setSuccess(200, 'Property deleted');
      } else {
        util.setError(404, `Property with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default PropertyController;
