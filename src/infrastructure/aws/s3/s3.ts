import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { getTodayFormatYYYYMMDD } from '../../../util/date';
import { ILogger } from '../../logger/interface';
import { awsConfig } from './config';

export interface IAWSS3 {
  init: () => void;
  upload: () => void;
}

// @ts-ignore
@injectable()
export class AWSS3 implements IAWSS3 {
  @inject(TYPES.Logger) private logger: ILogger;

  public init = () => {
    this.logger.info(awsConfig);
    const s3 = new AWS.S3({ accessKeyId: awsConfig.id, secretAccessKey: awsConfig.password });
    s3.createBucket(
      {
        Bucket: awsConfig.buckecName,
        CreateBucketConfiguration: {
          LocationConstraint: awsConfig.location,
        },
      },
      (error, data) => {
        if (error) this.logger.error(error);
        else {
          this.logger.info('Bucket created Success');
          this.logger.info(data);
        }
      },
    );
  };

  public upload = () => {
    const s3 = new AWS.S3({ accessKeyId: awsConfig.id, secretAccessKey: awsConfig.password });
    const logPath = path.join(__dirname, `../../../../logs/${getTodayFormatYYYYMMDD()}.log`);
    this.logger.debug(`Log path: ${logPath}`);
    // const errorLogPath = path.join(__dirname + `../../../../../logs/error/${getTodayFormatYYYYMMDD}.log`)
    const uploadFile = (fileName: string) => {
      const fileContent = fs.readFileSync(fileName);
      s3.upload(
        {
          Bucket: awsConfig.buckecName,
          Key: `log/http/${getTodayFormatYYYYMMDD()}.log`,
          Body: fileContent,
        },
        (error, data) => {
          if (error) this.logger.error(error);
          this.logger.debug(data);
        },
      );
    };

    uploadFile(logPath);
  };
}
