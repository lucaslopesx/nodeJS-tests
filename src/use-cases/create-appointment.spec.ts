import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppoitmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";


describe('Create Appointment', () => {
  it('should be able to create an appointment', () =>{
    const appointmentsRepository = new InMemoryAppoitmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository)
    
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11')
  
    startsAt.setDate(startsAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2)


    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should be not be able to create an appointment with overlapping dates', async () =>{
    const appointmentsRepository = new InMemoryAppoitmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository)
    
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-15')
  
    startsAt.setDate(startsAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2)

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-10'),
      endsAt: getFutureDate('2022-08-13')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-10'),
      endsAt: getFutureDate('2022-08-21')
    })).rejects.toBeInstanceOf(Error)
  })
})