import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Menu } from '../../types/menu.interface';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() menus: Menu[] = [];
    activeMenuIndex?: number;
    activeSubMenuIndex?: number;
    today: number = Date.now();
    todaySubsrciption: Subscription;

    constructor(private router: Router) {}

    @Input()
    set defaultActiveMenuIndex(index: number) {
        this.activeMenuIndex = index;
    }

    @Input()
    set defaultActiveSubMenuIndex(index: number) {
        this.activeSubMenuIndex = index;
    }

    ngOnInit() {
        this.activateMenuForCurrentUrl(this.router.url);
        this.todaySubsrciption = timer(0, 1000).subscribe(() => (this.today = Date.now()));
    }

    ngOnDestroy(): void {
        this.todaySubsrciption.unsubscribe();
    }

    activateMenu(index: number) {
        this.activeMenuIndex = this.activeMenuIndex === index ? undefined : index;
        this.activeSubMenuIndex = undefined;

        setTimeout(
            () => this.activeMenuIndex && this.activateMenuForCurrentUrl(this.router.url, false),
            300
        );
    }

    activateSubMenu(index: number) {
        this.activeSubMenuIndex = index;
    }

    private activateMenuForCurrentUrl(url: string, reload: boolean = true) {
        const foundActiveMenuIndex = this.menus.findIndex(
            menu =>
                menu.routerLink === url ||
                (menu.children || []).some(subMenu =>
                    url.includes(this.subsractText(subMenu.routerLink, menu.routerLink))
                )
        );
        if (reload) {
            this.activeMenuIndex =
                foundActiveMenuIndex !== -1 ? foundActiveMenuIndex : this.activeMenuIndex;
        }
        if (foundActiveMenuIndex !== -1) {
            this.activeSubMenuIndex = (this.menus[this.activeMenuIndex].children || []).findIndex(
                subMenu =>
                    url.includes(
                        this.subsractText(
                            subMenu.routerLink,
                            this.menus[this.activeMenuIndex].routerLink
                        )
                    )
            );
        }
    }

    private subsractText(longText: string, shortText: string): string {
        return longText.slice(shortText.length, longText.length);
    }
}
