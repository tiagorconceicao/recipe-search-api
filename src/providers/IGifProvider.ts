export interface IGif {
  url: string | null;
}

export interface IGifProvider {
  findOne(term: string): Promise<IGif>;
}
