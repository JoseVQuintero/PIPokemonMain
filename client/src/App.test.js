import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import PokemonsCreate, { validate } from "./components/PokemonsCreate/PokemonsCreate";
import store from "./store/index";
import { render } from "@testing-library/react";

let wrapper;
beforeEach(() => {

  wrapper = mount(
    <Provider store={store}>
      <PokemonsCreate />
    </Provider>
  );

});
afterEach(() => {
  jest.clearAllMocks();
});

describe("Redux Form Test", () => {

  it('El form debe tener un label que diga: "New Pokemon:"', () => {
    const { container } = render(
      <Provider store={store}>
        <PokemonsCreate />
      </Provider>
    );
    const element = container.querySelectorAll("label")[1];
    expect(element.innerHTML).toBe("New Pokemon");
  });

  it("El input de name deberia tener una clase pokemonName", () => {
    const ele = wrapper.find('input[name="name"]');
    expect(ele.hasClass("pokemonName")).toBeTruthy();
  });  

  it("Form controlada - El form deberia cambiar de estado cuando escriban en el input de name", async () => {    
      await wrapper.find('input[name="name"]').simulate("change", { target: { name: "name", value: "New Pokemon" } });
      wrapper.update();
      const ele = wrapper.find('input[name="name"]'); 
      expect(ele.hasClass("danger")).toBeFalsy();
      expect(ele.prop("value")).toBe("New Pokemon");
  });  

   describe("Validacion: ", () => {
     it("Form controlada - validate debe devolver un objeto con un error si el usarname no es un email valido:", () => {       

       const buttonElement  = wrapper.find('input[type="submit"]');
       expect(buttonElement).toHaveLength(1);
       expect(buttonElement.prop('value')).toEqual("Submit");
       
       buttonElement.simulate("click");
       wrapper.update();

       const ele = wrapper.find('input[name="name"]');
       expect(ele.hasClass("danger")).toBeFalsy();
       
     });     
   });

});