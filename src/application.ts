import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {CronComponent} from '@loopback/cron';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {JWTStrategy} from './authentication-strategy/jwt-strategy';
import {EmailManagerBindings} from './keys';
import {MySequence} from './sequence';
import {SyncProductCron} from './services/cronjob.service';
import {EmailService} from './services/email.service';
import {BcryptHasher} from './services/hash.password.bcrypt';
import {JWTService} from './services/jwt-service';
import {TallyHttpCallService} from './services/tally-http-call';
import {MyUserService} from './services/user-service';

export {ApplicationConfig};

export class FoodExpressApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    //set up bindings
    this.setUpBinding();

    this.component(AuthenticationComponent);
    this.component(CronComponent);
    registerAuthenticationStrategy(this, JWTStrategy);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBinding(): void {
    this.bind('service.hasher').toClass(BcryptHasher);
    this.bind('service.jwt.service').toClass(JWTService);
    this.bind('service.user.service').toClass(MyUserService);
    this.bind('service.tally.service').toClass(TallyHttpCallService);
    this.bind(EmailManagerBindings.SEND_MAIL).toClass(EmailService);
    this.bind('service.cronjob.service').toClass(SyncProductCron);
  }
}
