export default interface Cat {
  id?: string;
  name: string;
  breed: string;
  description?: string;
  birthdate?: Date;
  profilePicture?: string;
  createdAt?: Date;
  lastSeen?: Date;
}
