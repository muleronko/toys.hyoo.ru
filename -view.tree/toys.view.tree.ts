namespace $ { export class $my_toys_toy extends $mol_object {

	/// image \
	image() {
		return ""
	}

	/// title \
	title() {
		return ""
	}

	/// popularity 0
	popularity() {
		return 0
	}

	/// count 0
	count() {
		return 0
	}

	/// id \
	id() {
		return ""
	}

} }

namespace $ { export class $my_toys extends $mol_book {

	/// catalog_title @ \Toys
	catalog_title() {
		return $mol_locale.text( this.locale_contexts() , "catalog_title" )
	}

	/// filter_label @ \Filter
	filter_label() {
		return $mol_locale.text( this.locale_contexts() , "filter_label" )
	}

	/// Filter $mol_select value \Популярное
	@ $mol_mem()
	Filter() {
		return new $mol_select().setup( obj => { 
			obj.value = () => "Популярное"
		} )
	}

	/// Filter_labeler $mol_labeler 
	/// 	title <= filter_label 
	/// 	Content <= Filter
	@ $mol_mem()
	Filter_labeler() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.filter_label()
			obj.Content = () => this.Filter()
		} )
	}

	/// sort_label @ \Sort
	sort_label() {
		return $mol_locale.text( this.locale_contexts() , "sort_label" )
	}

	/// Sort $mol_select value \По релевантности
	@ $mol_mem()
	Sort() {
		return new $mol_select().setup( obj => { 
			obj.value = () => "По релевантности"
		} )
	}

	/// Sort_labeler $mol_labeler 
	/// 	title <= sort_label 
	/// 	Content <= Sort
	@ $mol_mem()
	Sort_labeler() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.sort_label()
			obj.Content = () => this.Sort()
		} )
	}

	/// Tools_row $mol_row sub / 
	/// 	<= Filter_labeler 
	/// 	<= Sort_labeler
	@ $mol_mem()
	Tools_row() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Filter_labeler() , this.Sort_labeler() )
		} )
	}

	/// Tools_card $mol_card sub / <= Tools_row
	@ $mol_mem()
	Tools_card() {
		return new $mol_card().setup( obj => { 
			obj.sub = () => [].concat( this.Tools_row() )
		} )
	}

	/// Tools $mol_float sub / <= Tools_card
	@ $mol_mem()
	Tools() {
		return new $mol_float().setup( obj => { 
			obj.sub = () => [].concat( this.Tools_card() )
		} )
	}

	/// toy_cards /
	toy_cards() {
		return [] as any[]
	}

	/// Goods $mol_row sub <= toy_cards
	@ $mol_mem()
	Goods() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => this.toy_cards()
		} )
	}

	/// Catalog $mol_page 
	/// 	title <= catalog_title 
	/// 	minimal_width 600 
	/// 	tools / - <= Catalog_close 
	/// 	body / 
	/// 		<= Tools 
	/// 		<= Goods
	@ $mol_mem()
	Catalog() {
		return new $mol_page().setup( obj => { 
			obj.title = () => this.catalog_title()
			obj.minimal_width = () => 600
			obj.tools = () => [] as any[]
			obj.body = () => [].concat( this.Tools() , this.Goods() )
		} )
	}

	/// pages / <= Catalog
	pages() {
		return [].concat( this.Catalog() )
	}

	/// toy_arg!id *
	toy_arg( id : any ) {
		return ({
		})
	}

	/// toy_image!id \
	toy_image( id : any ) {
		return ""
	}

	/// Toy_image!id $mol_image 
	/// 	uri <= toy_image!id 
	/// 	- style * filter \hue-rotate(50deg)
	@ $mol_mem_key()
	Toy_image( id : any ) {
		return new $mol_image().setup( obj => { 
			obj.uri = () => this.toy_image(id)
		} )
	}

	/// toy_title!id \
	toy_title( id : any ) {
		return ""
	}

	/// Toy_title!id $mol_view sub / <= toy_title!id
	@ $mol_mem_key()
	Toy_title( id : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.toy_title(id) )
		} )
	}

	/// toy_popularity_prefix @ \Popularity:
	toy_popularity_prefix() {
		return $mol_locale.text( this.locale_contexts() , "toy_popularity_prefix" )
	}

	/// toy_popularity!id 0
	toy_popularity( id : any ) {
		return 0
	}

	/// Toy_popularity!id $mol_view sub / 
	/// 	<= toy_popularity_prefix 
	/// 	<= toy_popularity!id
	@ $mol_mem_key()
	Toy_popularity( id : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.toy_popularity_prefix() , this.toy_popularity(id) )
		} )
	}

	/// toy_count_prefix @ \Selled:
	toy_count_prefix() {
		return $mol_locale.text( this.locale_contexts() , "toy_count_prefix" )
	}

	/// toy_count!id 0
	toy_count( id : any ) {
		return 0
	}

	/// Toy_count!id $mol_view sub / 
	/// 	<= toy_count_prefix 
	/// 	<= toy_count!id
	@ $mol_mem_key()
	Toy_count( id : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.toy_count_prefix() , this.toy_count(id) )
		} )
	}

	/// Toy_card!id $mol_link 
	/// 	minimal_width 256 
	/// 	minimal_height 256 
	/// 	arg <= toy_arg!id 
	/// 	sub / 
	/// 		<= Toy_image!id 
	/// 		<= Toy_title!id 
	/// 		<= Toy_popularity!id 
	/// 		<= Toy_count!id
	@ $mol_mem_key()
	Toy_card( id : any ) {
		return new $mol_link().setup( obj => { 
			obj.minimal_width = () => 256
			obj.minimal_height = () => 256
			obj.arg = () => this.toy_arg(id)
			obj.sub = () => [].concat( this.Toy_image(id) , this.Toy_title(id) , this.Toy_popularity(id) , this.Toy_count(id) )
		} )
	}

	/// toy_id!id \
	toy_id( id : any ) {
		return ""
	}

	/// toy!id $my_toys_toy id <= toy_id!id
	@ $mol_mem_key()
	toy( id : any ) {
		return new $my_toys_toy().setup( obj => { 
			obj.id = () => this.toy_id(id)
		} )
	}

} }

