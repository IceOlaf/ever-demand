import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
	IPromotionCreateObject,
	IPromotion,
} from '@modules/server.common/interfaces/IPromotion';
import gql from 'graphql-tag';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PromotionService {
	constructor(private readonly apollo: Apollo) {}

	//tstodo
	getAll(): Observable<any> {
		return this.apollo
			.query<any>({
				query: gql`
					query allPromotions {
						promotions {
							_id
							title
							description
							active
							activeFrom
							activeTo
							image
							purchasesCount
						}
					}
				`,
			})
			.pipe(
				map((result) => result.data || []),
				share()
			);
	}

	create(promotion: IPromotionCreateObject) {
		return this.apollo
			.mutate<{ promotion: IPromotionCreateObject }>({
				mutation: gql`
					mutation CreatePromotion(
						$promotion: IPromotionCreateObject!
					) {
						createPromotion(promotion: $promotion) {
							id
						}
					}
				`,
				variables: {
					promotion,
				},
			})
			.pipe(
				map((result) => result.data),
				share()
			);
	}
}
