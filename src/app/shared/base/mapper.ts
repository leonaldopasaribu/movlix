export interface DtoMapper<Dto, Entity> {
  toDto(param: Entity): Dto;
}

export interface EntityMapper<Dto, Entity> {
  toEntity(param: Dto): Entity;
}
