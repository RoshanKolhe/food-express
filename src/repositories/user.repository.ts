import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {FoodExpressDataSource} from '../datasources';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends TimeStampRepositoryMixin<
  User,
  typeof User.prototype.id,
  Constructor<
    DefaultCrudRepository<User, typeof User.prototype.id, UserRelations>
  >
>(DefaultCrudRepository) {
  constructor(
    @inject('datasources.foodExpress') dataSource: FoodExpressDataSource,
  ) {
    super(User, dataSource);
  }
}
