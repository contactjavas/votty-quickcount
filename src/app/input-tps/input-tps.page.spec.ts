import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputTpsPage } from './input-tps.page';

describe('InputTpsPage', () => {
  let component: InputTpsPage;
  let fixture: ComponentFixture<InputTpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTpsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputTpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
