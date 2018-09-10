parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"QdEO":[function(require,module,exports) {
module.exports={props:{name:{type:String,required:!0},value:{type:null,default:null},type:{type:String,required:!0},length:{type:[String,Number],default:null},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}},newItem:{type:Boolean,default:!1},relation:{type:Object,default:null},fields:{type:Object,default:null},values:{type:Object,default:null}}};
},{}],"rZM7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},t=require("../../../mixins/interface"),i=n(t);function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function s(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}exports.default={mixins:[i.default],name:"interface-one-to-many",data:function(){return{sort:{field:null,asc:!0},selectExisting:!1,selectionSaving:!1,selection:[],editExisting:null,addNew:null,edits:{},viewOptionsOverride:{},viewTypeOverride:null,viewQueryOverride:{},filtersOverride:[]}},computed:{relationSetup:function(){return!!this.relation},currentCollection:function(){return this.relation.collection_one.collection},relatedCollection:function(){return this.relation.collection_many.collection},relatedCollectionFields:function(){return this.relation.collection_many.fields},relatedKey:function(){return this.$lodash.find(this.relation.collection_many.fields,{primary_key:!0}).field},visibleFields:function(){return!1===this.relationSetup?[]:this.options.fields?Array.isArray(this.options.fields)?this.options.fields.map(function(e){return e.trim()}):this.options.fields.split(",").map(function(e){return e.trim()}):[]},items:function(){var e=this;return!1===this.relationSetup?[]:this.$lodash.orderBy((this.value||[]).filter(function(e){return!e.$delete}),function(t){return t[e.sort.field]},this.sort.asc?"asc":"desc")},columns:function(){var e=this;return!1===this.relationSetup?null:this.visibleFields.map(function(t){return{field:t,name:e.$helpers.formatTitle(t)}})},relatedDefaultValues:function(){return!1===this.relationSetup?null:this.relatedCollectionFields?this.$lodash.mapValues(this.relatedCollectionFields,function(e){return e.default_value}):null},relatedDefaultsWithEdits:function(){return!1===this.relationSetup?null:this.relatedDefaultValues?e({},this.relatedDefaultValues,this.edits):null},filters:function(){return!1===this.relationSetup?null:[].concat(s(this.options.preferences&&this.options.preferences.filters||[]),s(this.filtersOverride))},viewOptions:function(){if(!1===this.relationSetup)return null;var t=this.options.preferences&&this.options.preferences.viewOptions||{};return e({},t,this.viewOptionsOverride)},viewType:function(){return!1===this.relationSetup?null:this.viewTypeOverride?this.viewTypeOverride:this.options.preferences&&this.options.preferences.viewType||"tabular"},viewQuery:function(){if(!1===this.relationSetup)return null;var t=this.options.preferences&&this.options.preferences.viewQuery||{};return e({},t,this.viewQueryOverride)}},created:function(){this.relationSetup&&(this.sort.field=this.visibleFields&&this.visibleFields[0],this.setSelection())},watch:{value:function(){this.setSelection()},relation:function(){this.relationSetup&&(this.sort.field=this.visibleFields&&this.visibleFields[0],this.setSelection())}},methods:{setViewOptions:function(t){this.viewOptionsOverride=e({},this.viewOptionsOverride,t)},setViewQuery:function(t){this.viewQueryOverride=e({},this.viewQueryOverride,t)},setSelection:function(){this.value&&(this.selection=this.value.filter(function(e){return!e.$delete}))},changeSort:function(e){this.sort.field!==e?(this.sort.asc=!0,this.sort.field=e):this.sort.asc=!this.sort.asc},saveSelection:function(){var t=this;this.selectionSaving=!0;var i=(this.value||[]).filter(function(e){return!e.$delete}).map(function(e){return e[t.relatedKey]}),n=this.selection.map(function(e){return e[t.relatedKey]}),s=(this.value||[]).map(function(i){var s,l=i[t.relatedKey];if(!l)return i;if(!1===n.includes(l))return r(s={},t.relatedKey,i[t.relatedKey]),r(s,"$delete",!0),s;if(i.$delete&&n.includes(l)){var o=e({},i);return delete o.$delete,o}return i});n.forEach(function(n,r){if(!1===i.includes(n)){var l=e({},t.selection[r]);delete l[t.relation.field_many.field],s.push(l)}}),this.$emit("input",s),this.selectExisting=!1,this.selectionSaving=!1},dismissSelection:function(){this.setSelection(),this.selectExisting=!1},stageValue:function(e){var t=e.field,i=e.value;this.$set(this.edits,t,i)},saveEdits:function(){var t=this;this.$emit("input",[].concat(s((this.value||[]).map(function(i){return i.id===t.editExisting[t.relatedKey]?e({},i,t.edits):i})))),this.edits={},this.editExisting=!1},addNewItem:function(){this.$emit("input",[].concat(s(this.value||[]),[this.edits])),this.edits={},this.addNew=!1},removeRelated:function(e){var t=this,i=e.relatedKey;e.item;i?this.$emit("input",(this.value||[]).map(function(e){var n;return e[t.relatedKey]===i?(r(n={},t.relatedKey,e[t.relatedKey]),r(n,"$delete",!0),n):e})):this.$emit("input",(this.value||[]).filter(function(e){return e[t.relatedKey]!==i}))}}};
(function(){var t=exports.default||module.exports;"function"==typeof t&&(t=t.options),Object.assign(t,{render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"interface-one-to-many"},[!1===t.relationSetup?s("div",{staticClass:"notice"},[s("p",[s("i",{staticClass:"material-icons"},[t._v("warning")]),t._v(" "+t._s(t.$t("interfaces-one-to-many-relation_not_setup")))])]):[t.items.length?s("div",{staticClass:"table"},[s("div",{staticClass:"header"},[s("div",{staticClass:"row"},t._l(t.columns,function(e){return s("button",{key:e.field,attrs:{type:"button"},on:{click:function(s){t.changeSort(e.field)}}},[t._v(" "+t._s(e.name)+" "),t.sort.field===e.field?s("i",{staticClass:"material-icons"},[t._v(" "+t._s(t.sort.asc?"arrow_downward":"arrow_upward")+" ")]):t._e()])}))]),t._v(" "),s("div",{staticClass:"body"},t._l(t.items,function(e){return s("div",{key:e[t.relatedKey],staticClass:"row",on:{click:function(s){t.editExisting=e}}},[t._l(t.columns,function(i){return s("div",{key:i.field},[t._v(t._s(e[i.field]))])}),t._v(" "),s("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.$t("remove_related"),expression:"$t('remove_related')"}],staticClass:"remove-item",attrs:{type:"button"},on:{click:function(s){s.stopPropagation(),t.removeRelated({relatedKey:e[t.relatedKey],item:e})}}},[s("i",{staticClass:"material-icons"},[t._v("close")])])],2)}))]):t._e(),t._v(" "),s("button",{staticClass:"style-btn select",attrs:{type:"button"},on:{click:function(e){t.addNew=!0}}},[s("i",{staticClass:"material-icons"},[t._v("add")]),t._v(" "+t._s(t.$t("add_new"))+" ")]),t._v(" "),s("button",{staticClass:"style-btn select",attrs:{type:"button"},on:{click:function(e){t.selectExisting=!0}}},[s("i",{staticClass:"material-icons"},[t._v("playlist_add")]),t._v(" "),s("span",[t._v(t._s(t.$t("select_existing")))])])],t._v(" "),t.selectExisting?s("portal",{attrs:{to:"modal"}},[s("v-modal",{attrs:{title:t.$t("select_existing"),buttons:{save:{text:"save",color:"accent",loading:t.selectionSaving}}},on:{close:t.dismissSelection,save:t.saveSelection}},[s("v-items",{attrs:{collection:t.relatedCollection,filters:t.filters,"view-query":t.viewQuery,"view-type":t.viewType,"view-options":t.viewOptions,selection:t.selection},on:{options:t.setViewOptions,query:t.setViewQuery,select:function(e){t.selection=e}}})],1)],1):t._e(),t._v(" "),t.editExisting?s("portal",{attrs:{to:"modal"}},[s("v-modal",{attrs:{title:t.$t("editing_item"),buttons:{save:{text:"save",color:"accent",loading:t.selectionSaving}}},on:{close:function(e){t.editExisting=!1},save:t.saveEdits}},[s("div",{staticClass:"edit-modal-body"},[s("v-form",{attrs:{fields:t.relatedCollectionFields,values:t.editExisting},on:{"stage-value":t.stageValue}})],1)])],1):t._e(),t._v(" "),t.addNew?s("portal",{attrs:{to:"modal"}},[s("v-modal",{attrs:{title:t.$t("creating_item"),buttons:{save:{text:"save",color:"accent",loading:t.selectionSaving}}},on:{close:function(e){t.addNew=null},save:t.addNewItem}},[s("div",{staticClass:"edit-modal-body"},[s("v-form",{attrs:{fields:t.relatedCollectionFields,values:t.relatedDefaultsWithEdits},on:{"stage-value":t.stageValue}})],1)])],1):t._e()],2)},staticRenderFns:[],_compiled:!0,_scopeId:"data-v-cd6c84",functional:void 0});})();
},{"../../../mixins/interface":"QdEO"}]},{},["rZM7"], "__DirectusExtension__")