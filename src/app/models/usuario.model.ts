
export class Usuario {

  constructor(
    public usuario: object,
    public nombre: string,
    public tipoIdentifica: string,
    public numIdentifica: string,
    public ciudad: string,
    public fechNacimiento: string,
    public genero: string,
    public direccion: string,
    public activEconomica: string,
    public ingresos: string,
    public egresos: string,
    public activos: string,
    public pasivos: string,
    public patrimonios: string,
    public pep: string,
    public _id?: string,
  ){}

}


export enum ClienteStatus {
  active = 1,
  inactive = 2,
  new = 0
}


export const ClienteStatusMap: { [ key in ClienteStatus ]: { key: ClienteStatus, status: string, bgColor: string } } = {
  1: {
    key: ClienteStatus.active,
    status: 'Activo',
    bgColor: 'label-warning'
  },
  2: {
      key: ClienteStatus.inactive,
      status: 'Inactivo',
      bgColor: 'label-danger'
  },
  0: {
      key: ClienteStatus.new,
      status: 'Nuevo',
      bgColor: 'label-info'
  }
}


export enum ClienteGenero {
  masculino = 'M',
  femenino = 'F'
}

export const ClienteGeneroMap: {[key in ClienteGenero]: {key: ClienteGenero, icon:string}} = {
  M: {
    key: ClienteGenero.masculino,
    icon: 'hombre.png'
  },
  F: {
    key: ClienteGenero.femenino,
    icon: 'mujer.png'
  }
} 
