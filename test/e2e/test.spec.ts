import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/comment-on-question"
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question"
import { InMemoryAttachmentsRepository } from "test/repositories/in-memory-attachments-repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository"
import { describe, it } from "vitest"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let createQuestionUseCase: CreateQuestionUseCase
let commentOnQuestionUseCase: CommentOnQuestionUseCase

describe('test:e2e', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(inMemoryStudentsRepository)
    commentOnQuestionUseCase = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository)
    createQuestionUseCase = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('shoud be able to fetch all tests e2e', async () => {
    const createdQuestion = await createQuestionUseCase.execute({
      title: 'Título',
      content: 'Conteúdo',
      authorId: 'author-id',
      attachmentsIds: ['1']
    });

    // const comments = await commentOnQuestionUseCase.execute({
    //   authorId: createdQuestion.value?.question.authorId.toString(),
    //   questionId: createdQuestion.value?.question.id.toString(),
    //   content: 'Muito top'
    // })
    const questions = await inMemoryQuestionsRepository.findManyRecent({ page: 1 })

    console.log(questions[0].attachments.currentItems)
  });
});
