export default interface ICreateUserDTO {
  name: string;
  email: string;
  type: 'client' | 'provider';
  password: string;
}
