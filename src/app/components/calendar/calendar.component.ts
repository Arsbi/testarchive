import { Component, OnInit, ElementRef, Renderer2, OnChanges, SimpleChanges,DoCheck  } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  indexes = [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10, 11, 12 , 13 , 14 , 15,16,17,18,19,20, 21, 22, 23, 24, 25, 26 , 27, 28]
  times = ['5:41', '7:19', '13:31', '16:50', '19:38', '21:10']
  cities = ['Aachen', 'Amsterdam', 'Augsburg', 'Berlin', 'Bern', 'Bielefeld']
  isRed: boolean = false;
  backgroundColor: string = '#043602';
  backgroundlight: string = '#ddf0dd';

  
  

  contentIndex = 0
  leftText = [
    "Neden Hicrî Takvim? Çünkü biz müslümanız, müslüman bir milletiz. Müslümanın, müslüman bir milletin her şeyi, her işi her muamelesi; İslam'ca olmalı ve İslam'a göre hazırlanmalıdır.",
    "HÂKİMİYET ALLAH’INDIR! Hâkimiyet iki kısma ayrılır. Bunlardan biri Teşri-i hâkimiyet, diğeri de İcra-i hâkimiyet. Teşri-i hâkimiyet demek, Şeriat vaz etme, kanun koyma hâkimiyeti demektir ki, bu Allah-û Azimüşşan'a mahsustur. Bu hak ve bu salahiyeti kimseye vermemiştir."
  ]
  leftBelowText = [
    "Ve çünkü, İslam bir bütündür. Bölümleri birbirini tamamlayan parçalarıdır. Hem öyle parçalardır ki, onları birbirinden ayırmak mümkün değildir. Bir bütün olarak ve normal bir şekilde alınır ve tatbik",
    "İcra-i hâkimiyete gelince, bu mevcut kanunları icra etmek ve yürütmektir. Bu da asıl itibariyle Allah'a mahsustur. Ancak, Cenâb-ı Hak bu İcra hâkimiyetini, kendisine Halife olmak üzere yarattığı insana vermiştir ve bu suretle insanoğlu kanunları yürütme ve uygulama hâkimiyetine sahip olmuştur. Bu itibarla şu kaideyi söyleyebiliriz: 'İnsan dünyaya kanun yapmak ve yasa çıkartmak için değil, Hâkim-i'"
  ]
  middleText = [
    "edilirse randıman verir. Fakat, bazı bölümlerini alır,bazılarını terk edersiniz, aksar, sürtüşmeler meydana gelir. O halde, müslümanın takvimi de Hicrî olmalıdır; kameri aylara ve Hicrî yıla göre düzenlenmelidir. Hele hele devlete gitmek isteyen; İslam'ı devlet, Kur'an'ı anayasa yapmayı hedef alan bir cemaatin, bir ailenin gayreti, söz, fiil ve hareketleri mutlaka bu istikamette olmalıdır ve devletin temel yapısını teşkil",
    "Mutlak olan yaratanın gönderdiği İslam anayasasına dayalı Şeriat kanunlarını tatbik etmek ve uygulamak üzere gelmiştir!' Binaenaleyh, insanın kanun koymaya, anayasa yapmaya ne gücü yeter ne de kendisine böyle bir salahiyet verilmiştir."
  ]
  rightText = [
    "edecek müesseseleri yavaş yavaş kurmalıdır. Aslolan budur, hak olan budur. Müslüman orucunu Hicrî takvime göre tutacak, haccını bu takvime göre yapacak, bayramını bu takvime göre yapacak kurbanını bu takvime göre kesecektir. Ayrıca „İslam üstündür. Hiçbir şey ona üstün olamaz,“ hadis-i şerif fehvasınca İslam takvimi Hicrî Takvim'dir. Hiçbir takvim ondan üstün olamaz.",
    "'Lâ İlâhe İllallah', Tevhid akîdesinin veciz bir ifadesi, 'Hâkimiyet' de 'Tevhid akîdesi'nin hayattaki tatbikat şeklidir. Bu üç unsur, yani 'Lâ İlâhe İllallah', 'Tevhid' ve 'Hâkimiyet' birbirinin mütemmimi ve birbirinin lazım-i gayr-i mufarikidir. Öyle ki, birinin olmadığı yerde diğeri var sayılmaz ve kabul görmez. Çünkü, insanı insan yapan dilidir, kalbidir ve amel-i hayatıdır. İşte bu üç unsur, tam bir ahenk içinde olup 'Allah birdir' noktasına birleşirler; Dilinde ikrar, kalbinde"
  ]
  image = [
    "../../../assets/images/content_1.jpg",
    "../../../assets/images/content_2.jpg"
  ]

  city: any;
  displayModal = false
  displayMenu = false
  displayContentModal = false;
  data:any = []
  contentData:any = []
  today:any;
  dPresent:any;
  dPrevious:any;
  dNext:any;
  mPresent:any;
  mPrevious:any;
  mNext:any;
  getCityData:any;
  myIndex:any;
  calculatedHeight: number = 200 + window.innerHeight * 0.052;
  

  constructor(private calendarService: CalendarService, private el: ElementRef, private renderer: Renderer2) {}

  ngDoCheck(): void {
    // Check for changes in displayMenu
    if (this.displayMenu !== this.previousDisplayMenu) {
      this.onDisplayMenuChange(); // Call your method here
      this.previousDisplayMenu = this.displayMenu;
    }
  }

  onDisplayMenuChange() {
    // Your method logic here
    if (this.displayMenu) {
      setTimeout(() => {
        const firstDivInSidebar = this.el.nativeElement.querySelector('p-sidebar div:first-child');
        if (firstDivInSidebar) {
          this.renderer.setStyle(firstDivInSidebar, 'background-color', this.backgroundColor);
        }
      }, 0);
    }
  }

  private previousDisplayMenu: boolean = false;

  ngOnInit(): void {
    this.today = new Date();
    this.dNext = new Date();
    this.dPrevious = new Date();
    
    this.dPresent = this.today.getDate().toString();
    this.dNext.setDate(this.today.getDate() + 1);
    console.log(this.dNext);
    this.dPrevious.setDate(this.today.getDate() - 1);
    // this.dNext = (parseInt(this.dPresent) + 1).toString();
    this.mPresent = (this.today.getMonth() + 1).toString();
    this.mNext = (this.dNext.getMonth() + 1).toString();
    this.mPrevious = (this.dPrevious.getMonth() + 1).toString();

    
    this.calendarService.getCalendarData(this.dPresent, this.dPrevious.getDate().toString(), this.dNext.getDate().toString(), this.mPresent, this.mPrevious , this.mNext)
    .subscribe((data) => {
      console.log(data);
      this.cities = data[0].cities;
      this.data = data;
    });
    
    this.calendarService.getContentData()
    .subscribe((contentData) => {
      console.log("data: ", contentData);
      this.contentData = contentData
    });
    

    
  }
  previous(): void {
    this.dNext = this.today;
    this.today = new Date(this.dPrevious);
    this.dPresent =  (this.today.getDate()).toString();
    this.dPrevious.setDate(this.today.getDate() - 1);
    this.mPresent = (this.today.getMonth() + 1).toString();
    this.mNext = (this.dNext.getMonth() + 1).toString();
    this.mPrevious = (this.dPrevious.getMonth() + 1).toString();
    this.calendarService.getCalendarData(this.dPresent, this.dPrevious.getDate().toString(), this.dNext.getDate().toString(), this.mPresent, this.mPrevious , this.mNext).subscribe((data) => {
      console.log('Previous Data:', data);
      this.data = data;
      // Process otherData as needed
    });
  }
  nextD(): void {
    this.dPrevious = this.today;
    this.today = new Date(this.dNext);
    this.dPresent =  (this.today.getDate()).toString();
    this.dNext.setDate(this.today.getDate() + 1);
    this.mPresent = (this.today.getMonth() + 1).toString();
    this.mNext = (this.dNext.getMonth() + 1).toString();
    this.mPrevious = (this.dPrevious.getMonth() + 1).toString();

    this.calendarService.getCalendarData(this.dPresent, this.dPrevious.getDate().toString(), this.dNext.getDate().toString(), this.mPresent , this.mPrevious , this.mNext).subscribe((data) => {
      console.log('NextData:', data);
      this.data = data;
    });
  }
  toggleColors(color: string , lightColor:string): void {
    this.backgroundColor = color; 
    this.backgroundlight = lightColor;
    const firstDivInSidebar = this.el.nativeElement.querySelector('p-sidebar div:first-child');
    
    if (firstDivInSidebar) {
      this.renderer.setStyle(firstDivInSidebar, 'background-color', this.backgroundColor);
    }
  }
  

  nextContent() {
    if (this.contentIndex < 1) {
      this.contentIndex += 1
    }
  }

  prevContent() {
    if (this.contentIndex > 0) {
      this.contentIndex -= 1
    }
  }

  showContentDialogBox() {
    this.displayContentModal = true;
  }

  showDialogBox(city: any) {
    this.city = city;
    this.myIndex = this.data[0].cities.indexOf(city);
    this.displayModal = true;
  }
  

}
