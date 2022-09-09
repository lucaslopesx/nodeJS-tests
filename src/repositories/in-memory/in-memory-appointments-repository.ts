import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppoitmentsRepository implements AppointmentsRepository {
  
  public items: Appointment[] = []
  
  async create(appointment: Appointment): Promise<void> {
      this.items.push(appointment);
  }

  async findOverlapingAppointment(startAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt},
        { inclusive: true }
      )
    })


    if(!overlappingAppointment){
      return null
    }

    return overlappingAppointment

  }

}