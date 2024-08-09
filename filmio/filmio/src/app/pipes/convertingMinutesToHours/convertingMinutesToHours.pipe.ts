import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "convertingMinutesToHours",
  pure: true,
  standalone: true,
})
export class ConvertingMinutesToHoursPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return "00:00:00";
    }

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    const hoursString = hours < 10 ? "0" + hours : hours;
    const minutesString = minutes < 10 ? "0" + minutes : minutes;
    const secondsString = seconds < 10 ? "0" + seconds : seconds;

    return `${hoursString}:${minutesString}:${secondsString}`;
  }
}
