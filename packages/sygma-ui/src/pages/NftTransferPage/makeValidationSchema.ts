import * as yup from "yup";
import { utils } from "ethers";

import { BridgeConfig } from "../../sygmaConfig";
import { PreflightDetails } from "./NftTransferPage";

type MakeValidationSchemaOptions = {
  homeConfig: BridgeConfig | undefined;
  tokens: any;
  preflightDetails: PreflightDetails;
};
export default function makeValidationSchema({
  preflightDetails,
  homeConfig,
}: MakeValidationSchemaOptions) {
  const selectedToken = homeConfig?.tokens.find(
    (token) => token.address === preflightDetails.token
  );
  const DECIMALS =
    selectedToken && selectedToken.decimals ? selectedToken.decimals : 18;

  const REGEX =
    DECIMALS > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${DECIMALS}})?$`)
      : new RegExp(`^[0-9]{1,18}?$`);
  const validationSchema = yup.object().shape({
    tokenAmount: yup
      .string()
      .test("Token selected", "Please select a token", (value) => {
        if (!!value) {
          return true;
        } else {
          return false;
        }
      })
      .test("InputValid", "Input invalid", (value) => {
        try {
          return REGEX.test(`${value}`);
        } catch (error) {
          console.error(error);
          return false;
        }
      }),
    token: yup.string().required("Please select a token"),
    receiver: yup
      .string()
      .test("Valid address", "Please add a valid address", (value) => {
        return utils.isAddress(value as string);
      })
      .required("Please add a receiving address"),
  });
  return validationSchema;
}
