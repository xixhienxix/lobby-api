import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Edo_Cuenta } from '../models/accounting.model';
@Injectable()
export class AccountingService {
  constructor(
    @InjectModel('Edo_Cuenta')
    private readonly accountingModel: Model<Edo_Cuenta>,
  ) {}

  async getAccounts(hotel: string, folio: string): Promise<Edo_Cuenta[]> {
    return this.accountingModel
      .find({ Folio: folio, hotel: hotel })
      .then((data) => {
        if (!data) {
          return;
        }
        console.log(data);
        if (data) {
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async addPayment(hotel: string, body: any): Promise<Edo_Cuenta[]> {
    body.edoCuenta.hotel = hotel;
    return await this.accountingModel
      .create(body.edoCuenta)
      .then((data) => {
        if (!data) {
          return;
        }
        if (data) {
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async addHospedaje(hotel: string, body: any): Promise<Edo_Cuenta[]> {
    const insertedDocumentArray = [];

    body.edoCuenta.map(async (item: Edo_Cuenta) => {
      const result = await this.accountingModel.create(item).catch((err) => {
        console.log('Inserting Accounting Error: ', err);
        return err;
      });
      const insertedDocument = await this.accountingModel
        .findOne({
          _id: result.insertedId,
        })
        .catch((err) => {
          console.log('Serched Inserted Item', err);
          return err;
        });
      insertedDocumentArray.push(insertedDocument);
    });
    return insertedDocumentArray;
  }

  async updatePaymentStatus(hotel: string, body: any): Promise<Edo_Cuenta[]> {
    console.log('updatePaymentStatus: ', body);
    const _id = body._id;

    return this.accountingModel
      .findByIdAndUpdate(
        { _id, hotel: hotel },
        {
          $set: {
            Estatus: body.estatus,
            Fecha_Cancelado: body.fechaCancelado,
            Autorizo: body.autorizo,
          },
        },
      )
      .then((data) => {
        if (!data) {
          return;
        }
        if (data) {
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async getAllAccounts(hotel: string): Promise<Edo_Cuenta[]> {
    return this.accountingModel
      .find({ hotel: hotel })
      .then((data) => {
        if (!data) {
          return;
        }
        if (data) {
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async updateBalance(hotel: string, body: any): Promise<Edo_Cuenta[]> {
    return this.accountingModel
      .findOneAndUpdate(
        { _id: body._id, hotel: hotel },
        { $set: { Cargo: body.monto } },
      )
      .then((data) => {
        if (!data) {
          return;
        }
        if (data) {
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}
