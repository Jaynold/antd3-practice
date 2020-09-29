import React, { Component } from "react";
import { Form, Icon, Input, Button, Radio, Select } from "antd";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class App extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const usernameError = isFieldTouched("name") && getFieldError("name");
    const descriptionError =
      isFieldTouched("description") && getFieldError("description");
    const isActiveError =
      isFieldTouched("isActive") && getFieldError("isActive");
    const typeError =
      isFieldTouched("type") && getFieldError("type");
      const addressError =
      isFieldTouched("address") && getFieldError("address");

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    const typeOptions = [
      "Electricity",
      "Furniture",
      "Computers"
    ]

    return (
      <div className="App">
        <h1>Antd 3 Facilities Form </h1>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item
            label="Name: "
            validateStatus={usernameError ? "error" : ""}
            help={usernameError || ""}
          >
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please input new facility name!" },
              ],
            })(<Input placeholder="Facility name" />)}
          </Form.Item>
          <Form.Item
            label="Description: "
            validateStatus={descriptionError ? "error" : ""}
            help={descriptionError || ""}
          >
            {getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message: "Please input new facility description!",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Facility description"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Type: "
            validateStatus={typeError ? "error" : ""}
            help={typeError || ""}
          >
            {getFieldDecorator("type", {
              rules: [
                {
                  required: true,
                  message: "Please select facility type!",
                },
              ],
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Facility type"
                options={typeOptions}>
                  {typeOptions.map(province => (
                    <Select.Option key={province}>{province}</Select.Option>
                  ))}
                  </Select>
            )}
          </Form.Item>
          <Form.Item
            label="isActive: "
            validateStatus={isActiveError ? "error" : ""}
            help={isActiveError || ""}
          >
            {getFieldDecorator("isActive", {
              rules: [
                {
                  required: true,
                  message: "Please select an active status!",
                },
              ],
            })(
              <Radio.Group buttonStyle="solid" style={{ textAlign: "left" }}>
                <Radio style={radioStyle} value={true}>
                  Active
                </Radio>
                <Radio style={radioStyle} value={false}>
                  Not Active
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            label="Address: "
            validateStatus={addressError ? "error" : ""}
            help={addressError || ""}
          >
            {getFieldDecorator("address", {
              rules: [
                { required: true, message: "Please input new facility address!" },
              ],
            })(<Input placeholder="Facility address" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button> {" "}{" "}{" "}
            <Button
              type="ghost"
              htmlType="reset"
              onClick={() => this.props.form.resetFields()}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "myForm" })(App);