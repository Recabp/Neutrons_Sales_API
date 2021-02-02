export default interface IQeueProvider {
  publishOnQueue(queue: string, message: any): Promise<any>;


}
