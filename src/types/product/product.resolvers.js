import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

export default {
  Query: {
    product (_, args, ctx) {
      return Product.findById(args.id).exec();
    },
    products (_, args, ctx) {
      return Product.find().exec();
    }
  },
  Mutation: {
    newProduct (_, args, ctx) {
      return Product.create({ ...args.input, createdBy: ctx.user._id });
    },
    removeProduct (_, args, ctx) {
      return Product.findOneAndRemove(args.id).exec();
    },
    updateProduct (_, args, ctx) {
      return Product.findByIdAndUpdate(args.id, args.input, { new: true }).exec();
    }
  },
  Product: {
    __resolveType(product) {},
    createdBy (product) {
      return User.findById(product.createdBy._id);
    }
  }
}
