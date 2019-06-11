import createApi from "./api";
import MockAdapter from "axios-mock-adapter";
import adapter from "./adapter";
import {Operation} from "./reducer";

it(`Should make a correct API call to /hotels`, function () {
  const dispatch = jest.fn();
  const api = createApi(dispatch);
  const apiMock = new MockAdapter(api);
  const offersLoader = Operation.loadOffers();

  apiMock
    .onGet(`/hotels`)
    .reply(200, [{fake: true}]);

  return offersLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: `LOAD_OFFERS`,
        payload: adapter([{fake: true}]),
      });
    });
});
