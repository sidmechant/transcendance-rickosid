import { Controller, Param, Delete, Get, Body, Patch } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '@prisma/client';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  /**
   * Récupère un joueur par son ID.
   * @param id - L'ID du joueur à rechercher.
   * @returns Le joueur trouvé.
   */
  @Get(':id')
  async getPlayerById(@Param('id') id: number): Promise<Player> {
    id = Number(id);
    return this.playersService.getPlayerById(id);
  }

  /**
   * Met à jour l'URL de la photo de profil d'un joueur.
   * @param id - L'ID du joueur à mettre à jour.
   * @param urlPhotoProfile - La nouvelle URL de la photo de profil.
   * @returns Le joueur mis à jour.
   */
  @Patch(':id/photo')
  async setPlayerUrlPhotoProfile(@Param('id') id: number, @Body('urlPhotoProfile') urlPhotoProfile: string): Promise<Player> {
    id = Number(id);
    return this.playersService.setPlayerUrlPhotoProfile(id, urlPhotoProfile);
  }

  /**
   * Met à jour le pseudo d'un joueur.
   * @param id - L'ID du joueur à mettre à jour.
   * @param pseudo - Le nouveau pseudo du joueur.
   * @returns Le joueur mis à jour.
   */
  @Patch(':id/pseudo')
  async setPlayerPseudo(@Param('id') id: number, @Body('pseudo') pseudo: string): Promise<Player> {
    id = Number(id);
    return this.playersService.setPlayerPseudo(id, pseudo);
  }

  /**
   * Récupère tous les matches associés à un joueur par son ID.
   * @param id - L'ID du joueur.
   * @returns Un tableau de tous les matches joués par le joueur.
   */
  @Get(':id/matches')
  async getAllMatchesByPlayerId(@Param('id') id: number): Promise<any> {
    id = Number(id);
    return this.playersService.getAllMatchesByPlayerId(id);
  }

  /**
   * Récupère tous les joueurs.
   * @returns Un tableau de tous les joueurs.
   */
  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playersService.getAllPlayers();
  }

  /**
   * Supprime un joueur par son ID.
   * @param id - L'ID du joueur à supprimer.
   * @returns Le joueur supprimé.
   */
  @Delete(':id')
  async deletePlayer(@Param('id') id: number): Promise<Player> {
    id = Number(id);
    return this.playersService.deletePlayer(id);
  }
}

