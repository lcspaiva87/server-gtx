interface IUserRequesr {
  idColumn: string
  userId: string
  title: string
  tags: string[]
}
class CreateTaskUseCase {
  async execute({}: IUserRequesr) {}
}
