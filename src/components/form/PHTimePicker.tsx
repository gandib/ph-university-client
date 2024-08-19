import { Form, TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TTimePickerProps = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TTimePickerProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <TimePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
