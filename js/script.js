let uslugi_array = [
    "Wyciek pod zlewem",
    "Muszla do wymiany",
    "Montaż kranu",
    "Kaloryfer nie grzeje",
    "Woda nie schodzi",
    "Pęknięta rura",
    "Bojler nie działa",
    "Montaż kabin prysznicowych",
    "Spłuczka przecieka",
    "Montaż oświetlenia",
    "Wyrwane gniazdka",
    "Podłączanie płyt indukcyjnych",
    "Wymiana bezpieczników",
    "Gniazdko nie działa",
    "Brak prądu",
    "Pralka nie pobiera wody",
    "Pralka nie grzeje wody",
    "Zatkany filtr w pralce",
    "Bęben się nie kręci",
    "Pralka wyświetla błąd",
    "Pralka przecieka",
    "Piekarnik nie nagrzewa się",
    "Piekarnik nie włącza się",
    "Piekarnik wybija korki",
    "Piekarnik wyświetla błąd",
    "Zmywarka nie pobiera wody",
    "Zmywarka nie odprowadza wody",
    "Zmywarka nie grzeje wody",
    "Zmywarka nie rusza",
    "Zmywarka wyświetla błąd",
    "Drzwi zmywarki opadają",
    "Wieszanie telewizora na ścianie",
    "Skręcanie łóżek",
    "Skręcanie szaf",
    "Montaż półek",
    "Płytkowanie",
    "Regulacja i wymiana drzwi",
    "Remonty i wykańczanie wnętrz",
    "Malowanie i tapetowanie ścian",
    "Serwis lodówek",
    "Serwis klimatyzacji",
    "Prace w ogrodzie",
    "Wymiana zamków do drzwi",
    "Serwis kuchenek gazowych",
    "Naprawa bram"
]

let myModalAlternative;

$(document).ready(function() {

    if ( $('#modal').length != 0 ) {
        myModalAlternative = new bootstrap.Modal("#modal", {});
    }

    for (const usluga of uslugi_array) {
        $('.custom-select .options ul').append('<li onclick="selectUsluga(\''+usluga+'\')" class="option">'+usluga+'</li>')
    }

    $('.custom-select .value-selected').on('click', function() {
        $(this).closest( '.custom-select' ).find('.options').toggleClass('d-none')
    })

    
    // przyciski uslug (obrazki)
    $('a.usluga').on('click', function(e) {
        e.preventDefault();

        // console.log( $(this).attr('title') )

        $('.custom-select .value-selected').text($(this).attr('title'));

        if (myModalAlternative != null) {
            myModalAlternative.show();
        } else {
            scrollToForm()
        }
    })

    // przycisk po prawej (sidebar)
    $('.catalog_contact_buttons .mybtn').on('click', function(e) {
        e.preventDefault();
        myModalAlternative.show();
    })

    $('.options input').on('keyup', function() {
        let search_value = $(this).val()
        console.log(search_value)

        let regex = new RegExp(search_value, 'i')
        
        let new_array = uslugi_array.filter(item => regex.test(item) )

        $('.custom-select .options ul').empty();
        for (const usluga of new_array) {
            $('.custom-select .options ul').append('<li onclick="selectUsluga(\''+usluga+'\')" class="option">'+usluga+'</li>')
        }
    })
})

function openModal() {
    myModalAlternative.show();
}

function selectUsluga(text) {
    $('.options input').val('')
    $('.custom-select .value-selected').text(text)
    $('.custom-select .options').toggleClass('d-none')
    for (const usluga of uslugi_array) {
        $('.custom-select .options ul').append('<li onclick="selectUsluga(\''+usluga+'\')" class="option">'+usluga+'</li>')
    }
}

function scrollToForm() {
    $("html, body").animate(
        {
          scrollTop: $("#contact").offset().top - 60,
        },
        0
      );
}