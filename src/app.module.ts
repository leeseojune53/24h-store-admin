import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store/store.entity';
import { Resource, Database } from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { validate } from 'class-validator';

Resource.validate = validate;
AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: '24hstore',
      entities: [Store],
      synchronize: true,
      logging: true,
    }),
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          {
            resource: Store,
            options: { showProperties: ['id', 'title', 'address'] },
          },
        ],
      },
      auth: {
        authenticate: async (email, password) => {
          if (
            email === process.env.DEVELOPMENT_ADMIN_EMAIL &&
            password === process.env.DEVELOPMENT_ADMIN_PASSWORD
          ) {
            return {
              email: process.env.DEVELOPMENT_ADMIN_EMAIL,
              password: process.env.DEVELOPMENT_ADMIN_PASSWORD,
            };
          }
          return null;
        },
        cookieName: 'test',
        cookiePassword: process.env.DEVELOPMENT_ADMIN_PASSWORD,
      },
    }),
  ],
})
export class AppModule {}
