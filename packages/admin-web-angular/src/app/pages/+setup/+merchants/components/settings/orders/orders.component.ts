import { Component, Output, EventEmitter, Input } from '@angular/core';
import OrderBarcodeTypes, {
	orderBarcodeTypesToString,
} from '@modules/server.common/enums/OrderBarcodeTypes';
import QRCode from 'qrcode';

@Component({
	selector: 'ea-merchants-setup-orders-settings',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
})
export class SetupMerchantOrdersSettingsComponent {

	@Output()
	previousStep: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output()
	nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input()
	canCreateMerchant: boolean = false;

	iOrderBarcodeType: OrderBarcodeTypes = OrderBarcodeTypes.QR;
	barcodeData: string;
	barcodeDataUrl: string;
	isQRCode: boolean = true;
	ngxBarcodeFormat: string;
	img: string;

	orderBarcodeTypes = [
		{
			label: orderBarcodeTypesToString(OrderBarcodeTypes.QR),
			value: OrderBarcodeTypes.QR,
		},
		{
			label: orderBarcodeTypesToString(OrderBarcodeTypes.CODE128),
			value: OrderBarcodeTypes.CODE128,
		},
		{
			label: orderBarcodeTypesToString(OrderBarcodeTypes.CODE39),
			value: OrderBarcodeTypes.CODE39,
		},
		{
			label: orderBarcodeTypesToString(OrderBarcodeTypes.MSI),
			value: OrderBarcodeTypes.MSI,
		},
	];

	constructor() {
		this.loadBarcodetDataUrl();
	}

	async loadBarcodetDataUrl() {
		const dummyId = Date.now();
		this.barcodeDataUrl = await QRCode.toDataURL(dummyId.toString());
		this.barcodeData = dummyId.toString();
	}

	typeChange(type) {
		this.isQRCode = type === OrderBarcodeTypes.QR;
		if (!this.isQRCode) {
			this.ngxBarcodeFormat = orderBarcodeTypesToString(type);
		}
	}
}
