import {
    ClassSerializerInterceptor,
    Controller,
    Header,
    Post,
    Body,
    HttpCode,
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    NotFoundException,
    UnauthorizedException
  } from '@nestjs/common';
import { User } from '@prisma/client';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
import { Response } from 'express';
import {JwtAuthGuard} from 'src/auth/jwt.guard';
import * as qrcode from 'qrcode';
import { CrudService } from '../forty-twoapi/crud.service'


export class TwoFactorAuthenticationCodeDto {
  readonly twoFactorAuthenticationCode: string;
}

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController extends CrudService {
    constructor(private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService, 
      private readonly crud: CrudService) {
      super(crud);
    }

    /**
     * Pour envoyer le qr code en mode json il enlever Res responce
     */
    @Post('generate')
    //@UseGuards(JwtAuthGuard)
    async register(@Body() { id }: { id: number}, @Res() response) {
      try { 
        id = Number(id);
        console.log("ID ----- : ", id);
        const {secret, otpauthUrl} = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(id); 
        this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
        const code = await qrcode.toDataURL(otpauthUrl);
        await this.crud.updateTwoFactorAuthenticationSecret(id, secret);
        return { qrcode: code };
      } catch (error) {
        console.log('Erreur dans le controller generate');
        throw new NotFoundException('Erreur lors de l\'enregistrement 2fa');
      }
    }

  @Post('turn-on')
  @HttpCode(200)
  //@UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(@Body() { id }: { id: number }, @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto) {
    try {
      id = Number(id);
      const AuthenticationSecret = await this.crud.getTwoFactorAuthenticationSecret(id);
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, AuthenticationSecret);
      if (!isCodeValid) {
        console.log('error in turnOnTwoFactorAuthentication invalid code: ',isCodeValid );
        throw new UnauthorizedException('Wrong authentication code');
      }
      console.log("IscodeValid: ", isCodeValid);
    } catch (error) {
      console.log(error, 'Error turnOnTwoFactorAuthentication invalid code 1');
      throw new NotFoundException('Erreur lors de la validation du code Authentification a double facteur');
    }

    try {
      await this.twoFactorAuthenticationService.turnOnTwoFactorAuthentication(id);
    } catch (error) {
      console.log('error in turnOnTwoFactorAuthentication turn on impossible');
      throw new NotFoundException('Erreur lors de l\'activation de la double Authentification');
    }
}
}