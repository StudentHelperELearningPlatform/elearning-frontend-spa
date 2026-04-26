import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionCardComponent } from './question-card.component';

describe('QuestionCardComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;

  const multipleChoiceQuestion = {
    id: 'q1',
    text: 'What is 2 + 2?',
    type: 'MULTIPLE_CHOICE',
    points: 10,
    options: [
      { id: 'q1-o1', text: '3' },
      { id: 'q1-o2', text: '4' },
      { id: 'q1-o3', text: '5' },
      { id: 'q1-o4', text: '6' },
    ],
  };

  const trueFalseQuestion = {
    id: 'q2',
    text: 'The sky is blue.',
    type: 'TRUE_FALSE',
    points: 10,
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
  };

  const shortAnswerQuestion = {
    id: 'q3',
    text: 'Explain your answer.',
    type: 'SHORT_ANSWER',
    points: 10,
    options: [],
  };

  const setInputs = (question: {
    id: string;
    text: string;
    type: string;
    points: number;
    options: { id: string; text: string }[];
  }) => {
    (component as unknown as { question: () => typeof question }).question = () => question;
    (component as unknown as { index: () => number }).index = () => 0;
    (component as unknown as { total: () => number }).total = () => 10;
    (component as unknown as { selectedOptionId: () => string | null }).selectedOptionId = () => null;
    (component as unknown as { selectedAnswer: () => string | null }).selectedAnswer = () => null;
    (component as unknown as { isFlagged: () => boolean }).isFlagged = () => false;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
  });

  it('renders a textarea for SHORT_ANSWER questions', () => {
    setInputs(shortAnswerQuestion);

    const textarea = (fixture.nativeElement as HTMLElement).querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('renders 4 options for MULTIPLE_CHOICE questions', () => {
    setInputs(multipleChoiceQuestion);

    const optionButtons = (fixture.nativeElement as HTMLElement).querySelectorAll('.mc-option');
    expect(optionButtons.length).toBe(4);
  });

  it('renders exactly 2 buttons for TRUE_FALSE questions', () => {
    setInputs(trueFalseQuestion);

    const trueFalseButtons = (fixture.nativeElement as HTMLElement).querySelectorAll('.tf-option');
    expect(trueFalseButtons.length).toBe(2);
  });

  it('emits optionSelected when an option is clicked', () => {
    setInputs(multipleChoiceQuestion);

    const emitSpy = vi.spyOn(component.optionSelected, 'emit');
    const firstOption = (fixture.nativeElement as HTMLElement).querySelector('.mc-option') as HTMLButtonElement;

    firstOption.click();

    expect(emitSpy).toHaveBeenCalledWith('q1-o1');
  });

  it('emits flagged when flag button is clicked', () => {
    setInputs(multipleChoiceQuestion);

    const emitSpy = vi.spyOn(component.flagged, 'emit');
    const flagButton = (fixture.nativeElement as HTMLElement).querySelector('.flag-toggle') as HTMLButtonElement;

    flagButton.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
