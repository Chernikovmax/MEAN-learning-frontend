import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {hasValue} from "../email-recipients/constants";

@Component({
    selector: 'chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnChanges {
    @Input() removable = false;
    @Input() tooltip = '';
    @Output() removed = new EventEmitter();

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (hasValue(changes.removable?.currentValue)) {
            this.removable = true;
        }
    }

    notifyRemove() {
        this.removed.emit();
    }
}
