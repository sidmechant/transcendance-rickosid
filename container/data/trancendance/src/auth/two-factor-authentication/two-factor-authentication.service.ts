import { Injectable, NotFoundException, Res} from '@nestjs/common';
import { authenticator } from 'otplib';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { CrudService } from '../forty-twoapi/crud.service'

@Injectable()
export class TwoFactorAuthenticationService extends CrudService {
  constructor(private readonly crud: CrudService) {
    super(crud);
  }

  // public async generateTwoFactorAuthenticationSecret(email: string, userId: number) {
  //     try {
  //       console.log("mail === " + email + " user id ===  " + userId);
  //       const secret = authenticator.generateSecret();
  //       const otpauthUrl = authenticator.keyuri(
  //         email,
  //         process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
  //         secret
  //         ); 
  //         console.log("ICI!", email, userId);
  //         await this.crud.updateUserAuthenticationSecret(userId, secret);
  //         return {
  //           secret,
  //           otpauthUrl,
  //         };
  //     } catch (error) {
  //       console.error('Error generateTwoFactorAuthenticationSecret');
  //       throw new NotFoundException('Erreur lors de la génération du secret 2FA');
  //     }
  // }


  public async generateTwoFactorAuthenticationSecret(userId: any) {
    try {
        userId = userId.toString();
        const secret = authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(
            userId,
            process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
            secret
        );
        console.log(' ---- generateTwoFactorAuthenticationSecret --- ');
        console.log("Generated OTP URL:", otpauthUrl);
        console.log("Generated Secret: ", secret);      
        return {
            secret,
            otpauthUrl,
        };
    } catch (error) {
        console.error('Error generateTwoFactorAuthenticationSecret:', error);
        throw new NotFoundException('Erreur lors de la génération du secret 2FA');
    }
}



  public async turnOnTwoFactorAuthentication(userId: number) {
    try {
      await this.crud.updateUserAuthenticationEnabled(userId, true);
    } catch (error) {
      console.error("Error turnOnTwoFactorAuthentication");
      throw new NotFoundException("Erreur lors de l'activation de la double authentification");
    }
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    try {
      return toFileStream(stream, otpauthUrl);
    } catch (error) {
      console.error('Error pipeQrCodeStream');
      throw new NotFoundException('Erreur lors de la création du code QR');
    }
  }

  public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, twoFactorAuthenticationSecret: string) {
    try {
      console.log("Debug", twoFactorAuthenticationCode, twoFactorAuthenticationSecret);
      return authenticator.verify({token: twoFactorAuthenticationCode, secret: twoFactorAuthenticationSecret });
    } catch (error) {
      console.log("error in isTwoFactorAuthenticationCodeValid");
      throw new NotFoundException('Erreur lors de la verification du token generer par le qrcode');
    }
  }

}