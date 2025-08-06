import { APP_NAME } from "./env.config";

export const COOKIES = {
  flashMessage: `${APP_NAME}-flashMessage`,
  sga: {
    //   reception: {
    //     entry: {
    //       state: `${APP_NAME}-sga.reception.entry.state`,
    //       selectedItem: `${APP_NAME}-sga.reception.entry.selectedItem`,
    //       checkedItem: `${APP_NAME}-sga.reception.entry.checkedItem`,
    //       itemDataList: `${APP_NAME}-sga.reception.entry.itemDataList`,
    //     },
    //     pallets: {
    //       state: `${APP_NAME}-sga.reception.pallets.state`,
    //       selectedPallet: `${APP_NAME}-sga.reception.pallets.selectedPallet`,
    //       checkedPallet: `${APP_NAME}-sga.reception.pallets.checkedPallet`,
    //       palletDataList: `${APP_NAME}-sga.reception.pallets.palletDataList`,
    //       boxes: {
    //         state: `${APP_NAME}-sga.reception.entry.state`,
    //         selectedBox: `${APP_NAME}-sga.reception.entry.selectedBox`,
    //         checkedBox: `${APP_NAME}-sga.reception.entry.checkedBox`,
    //         boxDataList: `${APP_NAME}-sga.reception.entry.boxDataList`,
    //       },
    //     },
    //   },
    relocation: {
      direct: {
        checkedItem: `${APP_NAME}-sga.relocation.direct.checkedItem`,
      },
    },
    expedition: {
      picking: {
        route: `${APP_NAME}-sga.expedition.picking.route`,
        selectedItem: `${APP_NAME}-sga.expedition.picking.selectedItem`,
        checkedItem: `${APP_NAME}-sga.expedition.picking.checkedItem`,
        transferData: `${APP_NAME}-sga.expedition.picking.transferData`,
        itemDataList: `${APP_NAME}-sga.expedition.picking.itemDataList`,
      },
    },
  },
  production: {},
};
