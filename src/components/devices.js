import { Table, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

function Devices(props) {
  return (
    <Col>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> ID </th>
            <th scope="col"> 
                <FormattedMessage id="Device" />
            </th>
            <th scope="col">
                <FormattedMessage id="Value" />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.d.devices.map((device, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.desired.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default Devices;
