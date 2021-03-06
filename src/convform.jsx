import { address } from "bitcoinjs-lib";
import React from "react";
import Error from "./alert.jsx";
import FieldGroup from "./formfield.jsx";

export default class AddressConverterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            input: "MPE8npAXs49HMpQGkETFqBa8GBzsRM5FJn",
            output: "",
            prefix: 0, // 0 is Bitcoin
            errors: ""
        };
    }
    handleInputChange(event) {
        this.setState({ input: event.target.value });
    }
    handlePrefixChange(event) {
        this.setState({ prefix: parseInt(event.target.value) });
    }
    handleConvert() {
        try {
            const hashPart = address.fromBase58Check(this.state.input).hash;
            const converted = address.toBase58Check(hashPart, this.state.prefix);
            this.setState({ output: converted, errors: "" });
        } catch (errors) {
            this.setState({ errors: errors + "" });
        }
    }
    render() {
        return (
            <form>
                <FieldGroup
                    type="text"
                    value={this.state.input}
                    onChange={this.handleInputChange.bind(this)}
                    label="Input"
                    placeholder="Enter address"
                />
                <FieldGroup
                    type="number"
                    min="0"
                    max="255"
                    step="1"
                    value={isNaN(this.state.prefix) ? 0 : this.state.prefix}
                    onChange={this.handlePrefixChange.bind(this)}
                    label="New Prefix"
                    placeholder="Enter number"
                />
                <FieldGroup
                    type="button"
                    value="Convert"
                    onClick={this.handleConvert.bind(this)}
                />
                <FieldGroup
                    type="text"
                    value={this.state.output}
                    label="Output"
                    placeholder="Result will be displayed here"
                />
                {this.state.errors && <Error message={this.state.errors} />}
            </form>
        );
    }
}