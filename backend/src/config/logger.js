import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = 'logs'; // 여기 하위에 로그 파일 저장
const { combine, timestamp, printf } = winston.format;

// Define log format
// 헤더, 바디, params, 쿼리 전부 기록해보기
const logFormat = printf((info) => {
  console.log(info);
  return `${info.timestamp} ${info.level} - [message]: ${info.status}, ${info.message}, [url]: ${info.url}, \n[header]: ${info.header}, \n[body]: ${info.body}, \n[params]: ${info.params}, [query]: ${info.query}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
  //* uncaughtException 발생시 파일 설정
  exceptionHandlers: [
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.exception.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등)
// if (process.env.NODE_ENV !== 'production') {
// logger.add(
//   // 콘솔에 출력
//   new winston.transports.Console({
//     format: winston.format.combine(
//       winston.format.colorize(), // log level별로 색상 적용하기
//       winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
//     ),
//   }),
// );
// }

export { logger };
