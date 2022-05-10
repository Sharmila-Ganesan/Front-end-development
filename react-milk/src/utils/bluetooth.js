import { stringToArrayBuffer } from "./utils";


var device,server,service,characteristic;
var serviceId='6e400001-b5a3-f393-e0a9-e50e24dcca9e';
var txId='6e400002-b5a3-f393-e0a9-e50e24dcca9e';
var rxId='6e400003-b5a3-f393-e0a9-e50e24dcca9e';

export  async function connectionRequest(conAction,disConAction) {
    let options = {
        acceptAllDevices: true,
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
    };
    console.log("Getting device info");
    device = await navigator.bluetooth.requestDevice(options);
    if (!device) {
        throw Object.assign(
            new Error("No device Found"),
            { code: 404 }
         );
    }

    device.addEventListener('gattserverdisconnected',disConAction );
    
      console.log("device connected");
    btConnect(conAction);
  }

  
  
  export  async function btConnect(action) {
    try{
        if (!device) {
            return false;
        }
        console.log('Connecting to Bluetooth server... ');
        server = await device.gatt.connect();
        console.log('Connected. ');
        action();
        return true;
    }catch(err){
        return false
    }
   
  }

  export async function btDisconnect(){
    try{    
        if (!device) {
            return false;
        }
        console.log('Disconnecting the Bluetooth server... ');
        server = await device.gatt.disconnect();
        console.log('Disconnected. ');
        return true;
    }catch(err){
        return false
    }
  }
  

export const sendBtRequest = async(data)=>{
    try{
        //converting data to array buffer - bt accept only array buffer; 
        data = stringToArrayBuffer(data);
        service= await server.getPrimaryService(serviceId);
        let wrChar = await service.getCharacteristic(txId);
        await wrChar.writeValue(data);
        return true;

    }catch(err){
        console.log(err)
        return false;
    }
}


export const getBtResponse = async (action)=>{
    try{
        service= await server.getPrimaryService(serviceId);
        characteristic=await service.getCharacteristic(rxId);
        await characteristic.startNotifications();
        await characteristic.addEventListener('characteristicvaluechanged',action);
        console.log('Notifications have been started.');    
        return true;
    }catch(err){
        console.log(err)
        return false;
    }    
}

	